// --- ĐIỀU KHIỂN VIDEO POPUP ---
function moVideo() {
    document.getElementById("popupVideo").style.display = "flex";
}
function dongVideo() {
    document.getElementById("popupVideo").style.display = "none";
}

// --- ĐIỀU KHIỂN FORM ĐĂNG NHẬP / ĐĂNG KÝ ---
function moAuth(loai) {
    document.getElementById("authModal").style.display = "flex";
    chuyenTab(loai); 
}

function dongAuth() {
    document.getElementById("authModal").style.display = "none";
}

function chuyenTab(loai) {
    if (loai === 'login') {
        document.getElementById('formLogin').style.display = 'flex';
        document.getElementById('formRegister').style.display = 'none';
        document.getElementById('tabLogin').classList.add('active');
        document.getElementById('tabRegister').classList.remove('active');
    } else {
        document.getElementById('formLogin').style.display = 'none';
        document.getElementById('formRegister').style.display = 'flex';
        document.getElementById('tabRegister').classList.add('active');
        document.getElementById('tabLogin').classList.remove('active');
    }
}

// --- XỬ LÝ GỬI FORM ĐĂNG KÝ (KẾT NỐI BACKEND) ---
document.getElementById('formRegister').addEventListener('submit', function(event) {
    // 1. CHẶN TRÌNH DUYỆT TỰ ĐỘNG LOAD LẠI TRANG
    event.preventDefault(); 

    // 2. Lấy thông tin khách hàng gõ vào ô input
    const inputs = this.querySelectorAll('input');
    const fullname = inputs[0].value;
    const email = inputs[1].value;
    const password = inputs[2].value;
    const confirmPassword = inputs[3].value;

    // 3. Kiểm tra mật khẩu gõ lại có khớp không
    if (password !== confirmPassword) {
        alert('Mật khẩu nhập lại không khớp!');
        return;
    }

    // 4. Đóng gói dữ liệu để gửi đi
    const data = {
        fullname: fullname,
        email: email,
        password: password
    };

    // 5. Gọi "anh bồi bàn" Backend (Gửi dữ liệu tới cổng 3000)
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Thông báo kết quả cho người dùng
        alert(result.message);
        
        // Nếu thành công thì xóa trắng form và tự động chuyển sang tab Đăng nhập
        if (result.message.includes('thành công')) {
            this.reset();
            chuyenTab('login');
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra khi kết nối tới máy chủ!');
    });
});

// --- XỬ LÝ GỬI FORM ĐĂNG NHẬP ---
document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault(); // Chặn load lại trang

    // Lấy thông tin từ 2 ô nhập liệu của Form Đăng Nhập
    const inputs = this.querySelectorAll('input');
    const email = inputs[0].value;
    const password = inputs[1].value;

    const data = {
        email: email,
        password: password
    };

    // Gửi sang Backend cổng 3000
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message); // Báo Đăng nhập thành công hoặc Sai mật khẩu
        
        if (result.message.includes('thành công')) {
            dongAuth(); // Tắt bảng popup đi
            
            // Tạm thời hiển thị tên người dùng ra hộp thoại alert
            alert("Chào mừng " + result.fullname + " quay trở lại!");
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra khi kết nối tới máy chủ!');
    });
});