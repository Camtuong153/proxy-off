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

    // 2. Danh sách các Domain chạy qua Proxy
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

    // 3. Nếu khớp Domain -> Thử danh sách Proxy SỐNG (Đã ưu tiên Ping thấp lên đầu)
    if (matchDomain) {
        return "PROXY 43.209.173.229:27145; " +  // Ping: 82ms
               "PROXY 39.109.113.97:4090; " +     // Ping: 197ms
               "PROXY 117.236.124.166:3128; " +   // Ping: 250ms
               "PROXY 45.194.41.70:8080; " +      // Ping: 342ms
               "PROXY 43.133.175.183:7890; " +    // Ping: 361ms
               "PROXY 45.146.163.31:80; " +       // Ping: 395ms
               "PROXY 202.28.194.139:31280; " +   // Ping: 410ms
               "PROXY 112.216.54.226:12121; " +   // Ping: 581ms
               "PROXY 85.17.200.39:3128; " +      // Ping: 682ms
               "PROXY 8.215.112.214:7777; " +     // Ping: 699ms
               "PROXY 202.133.88.173:80; " +      // Ping: 876ms
               "PROXY 5.45.126.128:8080; " +      // Ping: 875ms
               "PROXY 13.125.44.24:80; " +        // Ping: 933ms
               "PROXY 14.139.235.82:3128; " +     // Ping: 941ms
               "PROXY 165.154.162.73:8888; " +    // Ping: 1436ms
               "PROXY 34.134.231.117:3129; " +    // Ping: 2354ms
               "DIRECT";
    }

    // 4. Mặc định đi trực tiếp cho các trang còn lại
    return "DIRECT";
}
