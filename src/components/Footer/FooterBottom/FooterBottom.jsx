import { Link } from "react-router-dom";

export default function FooterBottom() {
    return (
        <>
            <div className="bottom-footer px">
                <p>© 2026 <a href="https://ahmed-tech-zeta.vercel.app/">Ahmed Mohamed</a>. All rights reserved.</p>

                <ul>
                    <li>
                        <Link>Accessibility</Link>
                    </li>
                    <li>
                        <Link>about us</Link>
                    </li>
                    <li>
                        <Link>contact</Link>
                    </li>
                    <li>
                        <Link>blog</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
