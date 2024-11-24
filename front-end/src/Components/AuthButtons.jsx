// import React from 'react';
//  import { Link } from 'react-router-dom';

//  const AuthButtons = () => {
  
//   return (
//    <div className="auth-buttons">
//      <Link to="/signup" className="auth-button signup">Sign Up</Link>
//     <Link to="/signin" className="auth-button signin">Sign In</Link>
//     </div>
//   );
// };

//  export default AuthButtons;

import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // الحالة الافتراضية هي غير مسجل
  const navigate = useNavigate();

  // التحقق من حالة تسجيل الدخول عند تحميل المكون
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus); // تعيين حالة تسجيل الدخول بناءً على المخزن
  }, []);

  // دالة تسجيل الدخول (محاكاة)
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true'); // تخزين حالة تسجيل الدخول
    setIsLoggedIn(true); // تحديث الحالة إلى مسجل الدخول
  };

  // دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false'); // تحديث حالة التخزين لتسجيل الخروج
    setIsLoggedIn(false); // تحديث الحالة إلى غير مسجل
    navigate('/signin'); // إعادة التوجيه إلى صفحة تسجيل الدخول
  };

  return (
    <div className="auth-buttons">
      {isLoggedIn ? (
        <button onClick={handleLogout} className="auth-button signout">Sign Out</button>
      ) : (
        <>
          <Link to="/signup" className="auth-button signup">Sign Up</Link>
          <Link to="/signin" className="auth-button signin">Sign In</Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
