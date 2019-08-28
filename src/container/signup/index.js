import React, { Component } from 'react';
import './signup.css';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/signupAction';

class SignUp extends Component {
  state = {
    user: {
      name: '',
      suffix: '',
      emailPhone: '',
      username: '',
      password: '',
      dateOfBirth: '',
      gender: '',
      inviteCode: '',
      referralCode: '',
      hideFromSearch: false,
      confirmPassword: ''
    },
    errors: {
      invalidName: null,
      invalidDOB: null,
      invalidEmail: null,
      invalidPassword: null,
      passwordDoesntMatch: null
    },
    passHidden: true
  };

  async handleChange(e) {
    await this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    /*
    get user data from state and do validation on it
    */
    const {
      name,
      dateOfBirth,
      emailPhone,
      password,
      confirmPassword
    } = this.state.user;

    // validating Name field : {required, only alphabetic, max 50 character}
    const isValidName = /^([a-zA-Z ]){0,30}$/.test(name);
    if (isValidName === false) {
      await this.setState({
        errors: {
          ...this.state.errors,
          invalidName: 'name should be alphabetic and less than 30 characters'
        }
      });
    }

    // validating Date of Birth field : {required, and should be in format  - }

    // eslint-disable-next-line
    const isValidDOB = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/.test(
      dateOfBirth
    );
    if (isValidDOB === false) {
      await this.setState({
        errors: {
          ...this.state.errors,
          invalidDOB: 'Date should be in MM/DD/YYYY format'
        }
      });
    }

    // validating email : {required, and should be a valid email}
    // eslint-disable-next-line
    const isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailPhone
    );
    if (isValidEmail === false) {
      await this.setState({
        errors: {
          ...this.state.errors,
          invalidEmail: 'invalid email'
        }
      });
    }

    // validating password : {required, and should contain special charactera, min 8 chars}
    const isValidPassword = RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})'
    ).test(password);

    if (isValidPassword === false) {
      await this.setState({
        errors: {
          ...this.state.errors,
          invalidPassword: 'invalid password'
        }
      });
    }

    // confirm password validating : {required, and should be equal to password}
    if (password !== confirmPassword) {
      await this.setState({
        errors: {
          ...this.state.errors,
          passwordDoesntMatch: 'Password does not match'
        }
      });
    }

    const {
      invalidName,
      invalidDOB,
      invalidEmail,
      invalidPassword,
      passwordDoesntMatch
    } = this.state.errors;

    if (
      invalidName === null &&
      invalidDOB === null &&
      invalidEmail === null &&
      invalidPassword === null &&
      passwordDoesntMatch === null
    ) {
      const userData = {
        ...this.state.user
      };
      delete userData.confirmPassword;
      console.log(userData);
      this.props.signupUser(userData);
      this.props.history.push('/email-verification');
    } else {
      console.log('some errors are there');
    }
  }

  render() {
    return (
      <div>
        <div className="top-part">
          <div className="container">
            <div className="top-head">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                  <div className="sign-images">
                    <img src="images/sign-up.png" alt="" />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                  <div className="sign-up">
                    <h2>Sign up</h2>
                    <h3>
                      Welcome Let's sign you up. we protect your personal and
                      financial information, and privacy using industry standard
                      best practices, and in compliance with HIPAA and
                      applicable laws.Your data will be saved as you enter it.
                      You can safely stop or pause if you need to and come back
                      anytime to continue where you left off.
                    </h3>
                    <div className="form-parts">
                      <form onSubmit={e => this.handleSubmit(e)}>
                        <div className="left-part new-section">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                              <div className="form-group">
                                <div className="label">Full name*</div>
                                <select
                                  className="form-control gender-div"
                                  placeholder="Gender"
                                >
                                  <option value="Male">Mr</option>
                                  <option value="Female">Mrs</option>
                                </select>
                                <input
                                  id="fullName"
                                  name="name"
                                  type="text"
                                  className="form-control first-name-t"
                                  placeholder="Full name on government issued ID"
                                  required
                                  onChange={e => this.handleChange(e)}
                                />
                                <span className="error-divs">
                                  {this.state.errors.invalidName}
                                </span>
                              </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                              <div className="form-group">
                                <div className="label">Suffix</div>
                                <select
                                  className="form-control"
                                  name="suffix"
                                  placeholder="Suffix"
                                  onChange={e => this.handleChange(e)}
                                >
                                  <option value="">Choose</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <div className="form-group">
                                <div className="label">Date of Birth</div>

                                <input
                                  id="dob"
                                  name="dateOfBirth"
                                  type="text"
                                  className="form-control "
                                  placeholder="MM/DD/YYYY"
                                  required
                                  onChange={e => this.handleChange(e)}
                                />
                                <span className="error-divs">
                                  {this.state.errors.invalidDOB}
                                </span>
                              </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                              <div className="form-group">
                                <div className="label"> Gender</div>
                                <select
                                  className="form-control"
                                  placeholder="Suffix"
                                  name="gender"
                                  onChange={e => this.handleChange(e)}
                                >
                                  <option value="">Choose</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="border-style">
                            <div className="form-text">
                              Enter Invitation and/or Referral codes, if you
                              have any
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                name="inviteCode"
                                className="form-control sign-input"
                                placeholder="Invite code"
                                onChange={e => this.handleChange(e)}
                              />
                            </div>
                            <div className="form-group m-bottom">
                              <input
                                type="text"
                                name="referralCode"
                                className="form-control sign-input"
                                placeholder="Referal code"
                                onChange={e => this.handleChange(e)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="right-part">
                          <div className="form-group ">
                            <div htmlFor="" className="label ">
                              Email*
                            </div>
                            <input
                              id="email"
                              name="emailPhone"
                              type="email"
                              className="form-control"
                              required
                              placeholder="Email address to receive important emails from us"
                              onChange={e => this.handleChange(e)}
                            />

                            <span className="error-div">
                              {this.state.errors.invalidEmail}
                            </span>
                          </div>
                          <div className="form-group ">
                            <div htmlFor="userName" className="label">
                              User Name*
                            </div>
                            <input
                              id="userName"
                              name="username"
                              type="text"
                              className="form-control"
                              required
                              placeholder="Choose a unique username only you know and not used anywhere else."
                              onChange={e => this.handleChange(e)}
                            />

                            <span className="error-div"></span>
                          </div>
                          <div className="box ">
                            <div className="form-group ">
                              <input
                                id="password"
                                name="password"
                                required
                                type={
                                  this.state.passHidden ? 'password' : 'text'
                                }
                                className="form-control sign-input"
                                placeholder="Password*"
                                onChange={e => this.handleChange(e)}
                              />
                              <div
                                className="icon-parts"
                                onClick={() =>
                                  this.setState({
                                    passHidden: !this.state.passHidden
                                  })
                                }
                              >
                                <i
                                  className={
                                    this.state.passHidden
                                      ? 'fa fa-eye-slash'
                                      : 'fa fa-eye'
                                  }
                                  style={{
                                    fontSize: 16,
                                    color: '#C4C4C4',
                                    cursor: 'pointer'
                                  }}
                                />
                              </div>
                              <div className="icon-part">
                                <span></span>
                              </div>
                              <span className="error-div">
                                {this.state.errors.invalidPassword}
                              </span>
                            </div>
                            <p className="pass-text">
                              Use 8 or more characters with a mix of letters,
                              numbers & symbols{' '}
                            </p>
                          </div>
                          <div className="form-group">
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={this.state.passHidden ? 'password' : 'text'}
                              className="form-control sign-input "
                              placeholder="Confirm password*"
                              onChange={e => this.handleChange(e)}
                            />
                            <div
                              className="icon-parts"
                              onClick={() =>
                                this.setState({
                                  passHidden: !this.state.passHidden
                                })
                              }
                            >
                              <i
                                className={
                                  this.state.passHidden
                                    ? 'fa fa-eye-slash'
                                    : 'fa fa-eye'
                                }
                                style={{
                                  fontSize: 16,
                                  color: '#C4C4C4',
                                  cursor: 'pointer'
                                }}
                              />
                            </div>
                            <span className="error-div">
                              {this.state.errors.passwordDoesntMatch}
                            </span>
                          </div>
                        </div>

                        <div className="bottom-content">
                          <p className="bottom-text">
                            For your privacy and security by
                            default,non-healthcare providers need your user name
                            to search for you. They cannot search for you by
                            your real name
                          </p>
                          <label className="switch">
                            <input type="checkbox" />
                            <span
                              className="slider round"
                              onClick={async () => {
                                await this.setState({
                                  user: {
                                    hideFromSearch: !this.state.user
                                      .hideFromSearch
                                  }
                                });
                                console.log(
                                  'originally false',
                                  this.state.user.hideFromSearch
                                );
                              }}
                            />
                          </label>
                        </div>
                        <div className="rb">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block btn-submits"
                          >
                            Continue
                          </button>
                          <span className="sign-in">
                            If you already have an account then
                            <span className="blue-color">Sign In</span>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signupData: state.signupState.signupData
});

export default connect(
  mapStateToProps,
  { signupUser }
)(SignUp);
