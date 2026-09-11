function FindProxyForURL(url, host) {
    host = host.toLowerCase();

    // 1. Các IP nội bộ / Localhost -> Đi trực tiếp
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
        isInNet(dnsResolve(host), "127.0.0.1", "255.255.255.255"))
    {
        return "DIRECT";
    }

    // 2. Danh sách Domain chạy qua Proxy
    var targetDomains = [
        "*.youtube.com",
        "*.google.com",
        "*.tiktok.com",
        "*.roblox.com",
        "*.facebook.com"
    ];

    var matchDomain = false;
    for (var i = 0; i < targetDomains.length; i++) {
        if (shExpMatch(host, targetDomains[i])) {
            matchDomain = true;
            break;
        }
    }

    // 3. Danh sách 13 Proxy còn sống (Ưu tiên ping thấp nhất)
    if (matchDomain) {
        return "PROXY 39.109.113.97:4090; " +     // Ping: 130ms
               "PROXY 43.209.173.229:27145; " +  // Ping: 134ms
               "PROXY 45.146.163.31:80; " +       // Ping: 212ms
               "PROXY 43.133.175.183:7890; " +    // Ping: 244ms
               "PROXY 117.236.124.166:3128; " +   // Ping: 246ms
               "PROXY 202.28.194.139:31280; " +   // Ping: 287ms
               "PROXY 13.125.44.24:80; " +        // Ping: 401ms
               "PROXY 8.215.112.214:7777; " +     // Ping: 520ms
               "PROXY 85.17.200.39:3128; " +      // Ping: 549ms
               "PROXY 34.134.231.117:3129; " +    // Ping: 691ms
               "PROXY 14.139.235.82:3128; " +     // Ping: 815ms
               "PROXY 202.133.88.173:80; " +      // Ping: 1478ms
               "PROXY 5.45.126.128:8080; " +      // Ping: 2025ms
               "DIRECT";
    }

    return "DIRECT";
}
