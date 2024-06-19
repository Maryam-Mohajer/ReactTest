import React from 'react';
import styled from './Header.module.scss';

interface Props {
  color: string;
}
const Header = () => {
  const navItems = ['خانه', 'داشبورد', 'سفارشات', 'محصولات', 'کاربران'];
  return (
    <div className={styled.HeaderStyle}>
      <header>
        <div className={[styled.topMenuStyle, 'px-1 py-2 text-white'].join(' ')}>
          <div className="d-flex">
            <ul className="nav  my-md-0 text-small">
              {navItems.map((item: string, index: number) => (
                <li key={index}>
                  <a href="#" className="nav-link text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="py-2 border-bottom mb-3">
          <div className={styled.subMenuStyle}>
            <form className="col-6 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
              <input type="search" className="form-control" placeholder="جستجو ..." aria-label="Search" />
            </form>

            <div className="text-end">
              <button type="button" className={['btn mr-2', styled.messageBtn].join(' ')}>
                پیام جدید
              </button>
              <button type="button" className={[styled.btnlightGreen, 'btn'].join(' ')}>
                پروفایل کاربر
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
