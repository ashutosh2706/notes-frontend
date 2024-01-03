console.warn('Login Page working')
function checkUserCookie() {
    const allCookies = document.cookie;
    const cookieArray = allCookies.split('; ');
    const userCookie = cookieArray.find(cookie => cookie.startsWith('user='));

    if (userCookie) {
        window.location.href = '/home';
    }
}
checkUserCookie();
function loginUser(e) {
    e.preventDefault();
    var form = new FormData(document.getElementById('loginForm'));
    axios.post('https://localhost:8080/api/login', form)
    .then(response => {
        console.log('Success:', response.data);
        setCookie('user',form.get('username'),7);
        checkUserCookie();
    })
    .catch(error => {
        console.error('Error:', error);
        
    });
}

function setCookie(name, val, exp) {
    const curDate = new Date();
    curDate.setTime(curDate.getTime() + (exp * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + val + ';' +
        'expires=' + curDate.toUTCString() + ';' +
        'path=/';
}