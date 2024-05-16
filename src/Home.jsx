import React from 'react';
import './index.css';
import Navbar from './Navbar';
import Timeline from './Timeline';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Home() {
    return (
        <div className='overall-home-style'>
          {/* <a href="/" className="logo" title='elcruzo_logo'><span className='alt-color'>El</span>Cruzo</a> */}
          <Navbar />

          <div className='row'>
            <div className='col-md-6'>
              <h3 className='greetings'>Hi there&#44;</h3>
              <h2 className='intro-1'>I&#39;m Ayomide <span className='alt-color'>Adekoya</span></h2>
              <h2 className='intro-1'>Backend Developer&#46;</h2>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-2'>
              <hr className='header-hr'/>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6'>
              <p className='intro-2'>Welcome To My Timeline&#44; Nothing Fancy Here&#59; It&#39;s More Like A Diary Where Stuff Are Going To Be Dumped Because I Don&#39;t Want To Forget Them&#46; Let&#39;s Dive In&#46;&#46;&#46;</p>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-3'>
              <section className="text-center mb-5">
                <h3 className="foot">
                  <Link to="#" title="My Facebook" className="text-black me-4">
                    <i className="footerIcon footerIconFab"><FontAwesomeIcon icon={faFacebookF} /></i>
                  </Link>
                </h3>
                <h3 className="foot">
                  <Link to="https://www.twitter.com/symelcruzo" title="My Twitter" className="text-black me-4">
                    <i className="footerIcon footerIconTwi"><FontAwesomeIcon icon={faTwitter} /></i>
                  </Link>
                </h3>
                <h3 className="foot">
                  <Link to="https://www.instagram.com/xo.elcruzo" title="My Instagram" className="text-black me-4">
                    <i className="footerIcon footerIconInsta"><FontAwesomeIcon icon={faInstagram} /></i>
                  </Link>
                </h3>
                <h3 className="foot">
                  <Link to="https://www.linkedin.com/in/elcruzo" title="My LinkedIn" className="text-black me-4">
                    <i className="footerIcon footerIconLin"><FontAwesomeIcon icon={faLinkedin} /></i>
                  </Link>
                </h3>
                <h3 className="foot">
                  <Link to="https://www.github.com/elcruzo" title="My GitHub" className="text-black me-4">
                    <i className="footerIcon footerIconGit"><FontAwesomeIcon icon={faGithub} /></i>
                  </Link>
                </h3>
              </section>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4'>
              <div className='button-container'>
                <button role='link' className='button-1'><Link to="/projects" title="my projects" className='button-link'>My Projects</Link></button>
                <button role='link' className='button-2'><Link to="/contact" title="contact me" className='button-link'>Contact Me</Link></button>
              </div>
            </div>
          </div>

          <div className='row'>
              <Timeline />
          </div>
        </div>
    )
}

export default Home