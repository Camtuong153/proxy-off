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

    // 2. Danh sách các Domain bạn muốn chạy qua Proxy
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

    // 3. Nếu khớp Domain -> Thử lần lượt danh sách Proxy SỐNG
    if (matchDomain) {
        return "PROXY 109.199.119.160:80; " +
               "PROXY 176.61.151.123:80; " +
               "PROXY 144.24.128.145:3129; " +
               "PROXY 108.161.135.118:80; " +
               "PROXY 31.57.178.141:8080; " +
               "PROXY 143.198.135.176:80; " +
               "PROXY 85.14.247.185:3128; " +
               "PROXY 77.221.158.175:3128; " +
               "PROXY 45.10.163.12:80; " +
               "PROXY 8.215.112.214:7777; " +
               "PROXY 23.94.145.70:3128; " +
               "PROXY 14.161.10.46:80; " +
               "PROXY 172.237.11.129:3128; " +
               "PROXY 197.221.234.252:80; " +
               "PROXY 154.65.39.8:80; " +
               "PROXY 128.140.82.50:8443; " +
               "PROXY 47.89.159.212:13; " +
               "PROXY 167.99.124.118:80; " +
               "PROXY 31.28.4.192:80; " +
               "PROXY 195.114.209.50:80; " +
               "PROXY 196.1.93.16:80; " +
               "PROXY 107.181.155.43:8080; " +
               "PROXY 37.221.79.48:8888; " +
               "PROXY 14.139.235.82:3128; " +
               "PROXY 117.236.124.166:3128; " +
               "PROXY 165.154.162.73:8888; " +
               "PROXY 45.194.41.43:8080; " +
               "PROXY 41.220.16.215:80; " +
               "PROXY 69.87.216.54:7989; " +
               "PROXY 47.84.84.1:3128; " +
               "PROXY 190.58.248.86:80; " +
               "PROXY 197.221.240.246:80; " +
               "PROXY 45.194.41.103:8080; " +
               "PROXY 45.194.41.70:8080; " +
               "PROXY 43.209.173.229:27145; " +
               "PROXY 13.53.139.178:34039; " +
               "PROXY 45.146.163.31:80; " +
               "PROXY 13.125.44.24:80; " +
               "PROXY 109.122.194.122:9000; " +
               "PROXY 43.133.175.183:7890; " +
               "PROXY 197.221.249.198:80; " +
               "PROXY 34.134.231.117:3129; " +
               "PROXY 45.194.41.141:8080; " +
               "PROXY 5.45.126.128:8080; " +
               "PROXY 112.216.54.226:12121; " +
               "PROXY 182.253.109.133:1256; " +
               "PROXY 2.27.63.250:8888; " +
               "PROXY 103.156.16.236:8818; " +
               "PROXY 123.58.199.232:8168; " +
               "PROXY 124.198.131.164:3128; " +
               "PROXY 47.85.161.37:3128; " +
               "PROXY 196.1.97.198:80; " +
               "PROXY 174.138.119.88:80; " +
               "PROXY 154.68.64.2:80; " +
               "PROXY 202.133.88.173:80; " +
               "PROXY 103.237.102.191:11111; " +
               "PROXY 202.28.194.139:31280; " +
               "PROXY 45.91.248.107:80; " +
               "PROXY 39.109.113.97:4090; " +
               "PROXY 152.53.183.107:8081; " +
               "PROXY 85.17.200.39:3128; " +
               "PROXY 219.93.101.63:80; " +
               "PROXY 219.93.101.62:80; " +
               "DIRECT";
    }

    // 4. Mặc định đi trực tiếp cho các trang còn lại
    return "DIRECT";
}
