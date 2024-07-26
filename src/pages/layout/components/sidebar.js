import { useState, useEffect } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { MENU_ARR } from 'utils';
import clsx from 'clsx';

export const Sidebar = () => {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const [selected, setSelected] = useState('');
    const [subMenuOpen, setSubMenuOpen] = useState({
        1: true,
        2: false,
        3: false,
        4: false,
        5: false,
    });
    const programId = searchParams.get('programId');

    const handleMenuOpen = (id) => {
        const temp = subMenuOpen[id];
        setSubMenuOpen({ ...subMenuOpen, [id]: !temp });
    };
    useEffect(() => {
        setSelected(pathname);
    }, [selected]);

    return (
        <div id="leftmenu">
            <div className="leftmenu-inner">
                <h5 className="title">관리자페이지</h5>
                <ul className="tree-view">
                    {MENU_ARR.map((item, index) => (
                        <li className="mn-item" key={index} style={{ borderRadius: '0px' }}>
                            <a
                                className={clsx('mn-link', {
                                    active: subMenuOpen[item.id] == true,
                                    selected: selected == item.url,
                                })}
                                onClick={(e) => handleMenuOpen(item.id)}
                            >
                                <span className="mn-icon">
                                    <i className={item.icon} />
                                </span>
                                <span className="mn-name">{item.title}</span>
                                <span className="mn-collapse">
                                    <i className="icon-chevron-right" />
                                </span>
                            </a>
                            {subMenuOpen[item.id] ? (
                                <div className="mn-item-container">
                                    <ul className="nested active">
                                        {item.children &&
                                            item.children.map((child) => (
                                                <li
                                                    className={clsx('mn-item', { selected: programId == child.key })}
                                                    key={child.key}
                                                >
                                                    <Link to={child.url} className="mn-link">
                                                        <span className="mn-name">{child.title}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ) : (
                                <></>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <Link to="https://portal.azure.com" className="mn-link footer" target="_blank">
                <h6 className="move">Azure Portal</h6>
            </Link>
        </div>
    );
};
