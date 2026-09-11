function FindProxyForURL(url, host) {
    // 1. Chuyển host về chữ thường để so sánh chính xác
    host = host.toLowerCase();

    // 2. Các địa chỉ IP nội bộ / Localhost -> Truy cập trực tiếp (DIRECT)
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") ||
        isInNet(dnsResolve(host), "127.0.0.1", "255.255.255.255")) {
        return "DIRECT";
    }

    // 3. Các tên miền chạy qua Proxy cố định
    // Thay 'example.com' bằng tên miền bạn muốn đi qua proxy
    if (shExpMatch(host, "*.youtube.com") || 
        shExpMatch(host, "google.com") ||
        shExpMatch(host, "*.facebook.com")) {
        // Cú pháp: PROXY IP_hoặc_Domain:Cổng
        return "PROXY 192.168.1.15:8080";
    }

    // 4. Nếu Proxy chính bị lỗi, tự động chuyển sang Proxy dự phòng hoặc DIRECT
    // Ví dụ: Thử Proxy 1 -> Nếu lỗi thử Proxy 2 -> Nếu lỗi đi DIRECT
    /*
    if (shExpMatch(host, "*.internal-work.com")) {
        return "PROXY 10.0.0.1:8080; PROXY 10.0.0.2:8080; DIRECT";
    }
    */

    // 5. Tất cả các trang còn lại mặc định đi trực tiếp (hoặc đổi thành PROXY tùy nhu cầu)
    return "DIRECT";
}
