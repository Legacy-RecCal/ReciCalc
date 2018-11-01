import React from 'react';
import { withFormik, Form, Field } from 'formik';

const Signup = () => (
  <div className="ui middle aligned center aligned grid">
    <div className="column">
      <h2 className="ui image header">
        <div className="content">Sign Up</div>
      </h2>
      <Form className="ui large form">
        <div className="ui stacked secondary  segment">
          <div className="field">
            <div className="ui left icon input">
              <i className="user icon" />
              <Field
                type="username"
                name="username"
                placeholder="Username"
              />{' '}
              {/*Fix Me */}
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="lock icon" />
              <Field
                type="password"
                name="password"
                placeholder="Password"
              />{' '}
            </div>
            <div className="ui left icon input">
              <i className="lock icon" />
              <input
                type="password"
                name="password"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="ui fluid large teal submit button">
            <button type="submit">Sign Up</button>
          </div>
        </div>

        <div className="ui error message" />
      </Form>
    </div>
  </div>
);

const SuperSubmit = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || '',
      password: password || '',
    };
  },

  handleSubmit(value) {
    axios
      .post('/auth/signup', {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        if (response.data.name) {
          alert('username already exists!');
        } else {
          alert('sign up successful!');
          axios
            .post('/auth/login', {
              username: this.state.username,
              password: this.state.password,
            })
            .then(response => {
              console.log(response);
              this.setState({
                username: response.data.user.username,
                userId: response.data.user.id,
              });
              alert('Logged In Successfully!');
              sessionStorage.setItem('username', response.data.user.username);
              sessionStorage.setItem('userId', response.data.user.id);
              localStorage.setItem('Token', response.data.token);
              this.props.history.push('/recipies');
            })
            .catch(err => {
              console.log(err, 'errroor');
              alert('incorrect username or password');
            });
        }
      });
    e.preventDefault();
  },
})(Signup);

export default SuperSubmit;
