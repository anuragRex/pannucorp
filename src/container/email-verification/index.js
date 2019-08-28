import React, { Component } from 'react';
import './email-verification.css';
import { connect } from 'react-redux';
import { verifyEmail } from '../../actions/signupAction';

class EmailVerification extends Component {
  state = {
    emailCode: '123456',
    email: ''
  };

  async handleChange(e) {
    await this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const payload = {
      email: this.props.signupData.signUpData.emailPhone,
      emailCode: this.state.emailCode
    };
    this.props.verifyEmail(payload);
  }

  render() {
    return (
      <div className="top-part">
        <div className="container">
          <div className="top-head">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                <div className="email-images">
                  <img src="images/email.jpg" alt="" />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <div className="form-part">
                  <h2>Enter email verification code</h2>
                  <h3>
                    Enter the email verification code which you have recieved on
                    your registered email id.
                  </h3>
                  <form onSubmit={e => this.handleSubmit(e)}>
                    <span className="time-p">02.00</span>
                    <div className="form-group">
                      <input
                        type="text"
                        name="emailCode"
                        className="form-control form-st"
                        placeholder="727-900-0065"
                        required
                        onChange={e => this.handleChange(e)}
                      />
                      <span className="resend-code">Resend Code</span>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-submit"
                    >
                      Verify Email
                    </button>
                  </form>
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
  { verifyEmail }
)(EmailVerification);
