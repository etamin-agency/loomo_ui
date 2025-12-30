import React from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <>
        <header>
            <nav>
                <span className='logo-wrapper'>
                    <img width={50} src={logo} alt='logo_site'/>
                    <span>
                        <small>HUCKERS HUB</small> <br/>
                        <b>Cybersecurity Training</b>
                    </span>
                </span>

                    <ul className='Navlinks'>
                        <li><Link>Bosh sahifa</Link></li>
                        <li><Link>Kurslar</Link></li>
                        <li><Link>Labaratoriyalar</Link></li>
                        <li><Link>Jadval</Link></li>
                        <li><Link>O'qituvchilar</Link></li>
                        <li><Link>FAQ</Link></li>
                        <li><Link>Ariza</Link></li>
                        <li><Link>Aloqa</Link></li>
                    </ul>
            </nav>
        </header>
      
    </>
  )
}

export default Navbar
