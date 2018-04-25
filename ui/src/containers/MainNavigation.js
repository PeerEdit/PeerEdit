import React from 'react';

import { ResourceLookupForm } from '../components/container/ResourceLookupForm';
import { ResourceUploadForm } from '../components/container/ResourceUploadForm';
import { LoginOrRegisterModal } from '../components/presentational/LoginOrRegisterModal';
import { AuthDetector } from '../components/container/AuthDetector';
import { LoginOrChild } from '../components/container/LoginOrChild';

import Paper from 'material-ui/Paper';

import '../../scss/landing-page.scss';
import 'bootstrap';

class MainNavigation extends React.Component {
    render() {
        return (
            <div>

                <nav className="navbar navbar-light bg-light static-top">
                  <div className="container">
                    <a className="navbar-brand" href="#">PeerEdit</a>
                    <AuthDetector />
                  </div>
                </nav>


                <header className="masthead text-white text-center">
                  <div className="overlay"></div>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-6 mx-auto">
                        <h1 className="mb-5">Drop a PDF here and join the conversation!</h1>
                        <ResourceLookupForm />
                      </div>
                      <div className="col-lg-6 mx-auto">
                        <h1 className="mb-5">Or tell us about a new PDF to add:</h1>
                        <LoginOrChild message={"Log in to report resource"}>
                          <ResourceUploadForm />
                        </LoginOrChild>
                      </div>
                    </div>
                  </div>
                </header>


                <section className="features-icons bg-light text-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                          <div className="features-icons-icon d-flex">
                            <i className="icon-screen-desktop m-auto text-primary"></i>
                          </div>
                          <h3>Collaborative</h3>
                          <p className="lead mb-0">Making it easy to share insights with colleages and friends.</p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                          <div className="features-icons-icon d-flex">
                            <i className="icon-layers m-auto text-primary"></i>
                          </div>
                          <h3>Open Source</h3>
                          <p className="lead mb-0">Our source code is <a href="https://www.github.com/PeerEdit/PeerEdit">here</a> to look at.</p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                          <div className="features-icons-icon d-flex">
                            <i className="icon-check m-auto text-primary"></i>
                          </div>
                          <h3>Extensible</h3>
                          <p className="lead mb-0">Contribute to our Github project and report issues and improvements!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>


                <section className="showcase">
                  <div className="container-fluid p-0">
                    <div className="row no-gutters">

                      <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: 'url("/img/discuss.gif")'}}></div>
                      <div className="col-lg-6 order-lg-1 my-auto showcase-text" style={{padding: '3em'}}>
                        <h2>Discuss</h2>
                        <p className="lead mb-0">Add comments and share your insights!</p>
                      </div>
                    </div>
                    <div className="row no-gutters">
                      <div className="col-lg-6 text-white showcase-img" style={{backgroundImage: 'url("/img/bg-showcase-2.jpg")'}}></div>
                      <div className="col-lg-6 my-auto showcase-text" style={{padding: '3em'}}>
                        <h2>Upload</h2>
                        <p className="lead mb-0">Report new information to discuss!</p>
                      </div>
                    </div>
                    <div className="row no-gutters">
                      <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: 'url("/img/bg-showcase-3.jpg")'}}></div>
                      <div className="col-lg-6 order-lg-1 my-auto showcase-text" style={{padding: '3em'}}>
                        <h2>Share</h2>
                        <p className="lead mb-0">Copy links and share insights with your friends!</p>
                      </div>
                    </div>
                  </div>
                </section>


                <section className="testimonials text-center bg-light">
                  <div className="container">
                    <h2 className="mb-5">What people are saying...</h2>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                          <img className="img-fluid rounded-circle mb-3" src="img/testimonials-1.jpg" alt="" />
                          <h5>Margaret E.</h5>
                          <p className="font-weight-light mb-0">"This is fantastic! Thanks so much guys!"</p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                          <img className="img-fluid rounded-circle mb-3" src="img/testimonials-2.jpg" alt="" />
                          <h5>Fred S.</h5>
                          <p className="font-weight-light mb-0">"I love being able to share specific things with just a few clicks!"</p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                          <img className="img-fluid rounded-circle mb-3" src="img/testimonials-3.jpg" alt="" />
                          <h5>Sarah W.</h5>
                          <p className="font-weight-light mb-0">"Thanks so much for making these free resources available to us!"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>


                <section className="call-to-action text-white text-center">
                  <div className="overlay"></div>
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-9 mx-auto">
                        <h2 className="mb-4">Why are you still reading? Get started now!</h2>
                      </div>
                    </div>
                  </div>
                </section>

                <footer className="footer bg-light">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
                        <ul className="list-inline mb-2">
                          <li className="list-inline-item">
                            <a href="#">About</a>
                          </li>
                          <li className="list-inline-item">&sdot;</li>
                          <li className="list-inline-item">
                            <a href="#">Contact</a>
                          </li>
                          <li className="list-inline-item">&sdot;</li>
                          <li className="list-inline-item">
                            <a href="#">Terms of Use</a>
                          </li>
                          <li className="list-inline-item">&sdot;</li>
                          <li className="list-inline-item">
                            <a href="#">Privacy Policy</a>
                          </li>
                        </ul>
                        <p className="text-muted small mb-4 mb-lg-0">&copy; PeerEdit 2018. All Rights Reserved.</p>
                      </div>
                      <div className="col-lg-6 h-100 text-center text-lg-right my-auto">
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item mr-3">
                            <a href="#">
                              <i className="fa fa-facebook fa-2x fa-fw"></i>
                            </a>
                          </li>
                          <li className="list-inline-item mr-3">
                            <a href="#">
                              <i className="fa fa-twitter fa-2x fa-fw"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#">
                              <i className="fa fa-instagram fa-2x fa-fw"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </footer>
            </div>
        );
    }
}

export { MainNavigation };