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
