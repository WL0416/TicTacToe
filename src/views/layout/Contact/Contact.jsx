import React, { useState } from "react";
import validator from "validator";
import PropTypes from "prop-types";
import axios from "axios";

const Contact = (props) => {
  const { contactApi } = props;
  const [unsent, setUnsent] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentErr, setSentErr] = useState(false);
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [subjectValid, setSubjectValid] = useState(true);
  const [messageValid, setMessageValid] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const checkForm = () => {
    const n = name.trim();
    const e = email.trim();
    const s = subject.trim();
    const m = message.trim();

    const validName = n.length > 0;
    const validEmail = validator.isEmail(e);
    const validSubject = s.length > 0;
    const validMessage = m.length > 0;

    setNameValid(validName);
    setEmailValid(validEmail);
    setSubjectValid(validSubject);
    setMessageValid(validMessage);

    return validName && validEmail && validSubject && validMessage;
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = checkForm();

    if (isValid) {
      setUnsent(false);
      setSending(true);
      axios
        .post(contactApi, {
          name,
          email,
          subject,
          message,
        })
        .then(
          (response) => {
            // console.log(response);
            setSending(false);
            setSent(true);
            if (response.status !== 200) setSentErr(true);
          },
          (error) => {
            setSending(false);
            setSent(true);
            setSentErr(true);
          }
        );
    }
  };

  const sendingCopy = (
    <div>I am sending your message over the wire.......... please hold.</div>
  );

  const sendingErr = (
    <div>There was an error sending your request. Please try again</div>
  );

  const sentCopy = (
    <div>
      <strong>
        Okay we got your message, we will be touching base shortly.
      </strong>
    </div>
  );

  const form = (
    <form id="contact_form" onSubmit={handleSubmit} method="POST">
      <FieldHolder
        goodclasses="input_holder left"
        badclasses="error"
        isvalid={nameValid.toString()}
      >
        <label>
          Name <span className="required">is a required field</span>
        </label>
        <input
          type="text"
          className="input name"
          placeholder="Name"
          value={name}
          onChange={onNameChange}
          required
        />
      </FieldHolder>

      <FieldHolder
        goodclasses="input_holder left"
        badclasses="error"
        isvalid={emailValid.toString()}
      >
        <label>
          Email <span className="required">is a required field</span>
        </label>
        <input
          type="email"
          className="input name"
          placeholder="Your Email"
          value={email}
          onChange={onEmailChange}
          required
        />
      </FieldHolder>

      <FieldHolder
        goodclasses="input_holder select_option"
        badclasses="error"
        isvalid={subjectValid.toString()}
      >
        <label>
          Subject <span className="required">is a required field</span>
        </label>
        <select onChange={onSubjectChange} required>
          <option value={subject}>Choose one</option>
          <option>Join / Login</option>
          <option>An issue with the website</option>
          <option>Other</option>
        </select>
      </FieldHolder>

      <FieldHolder
        goodclasses="input_holder clear message"
        badclasses="error"
        isvalid={messageValid.toString()}
      >
        <label>
          Message <span className="required">is a required field</span>
        </label>
        <textarea
          className="input textarea"
          value={message}
          onChange={onMessageChange}
          required
        ></textarea>
      </FieldHolder>

      <button type="submit" className="button">
        <span>
          SEND <span className="fa fa-caret-right"></span>
        </span>
      </button>
      <p className="disclaimer">
        Any personal information collected in this contact form is so that we
        can send you the information you have requested. It will not be used for
        any other reason.
      </p>
    </form>
  );

  return (
    <>
      {unsent && form}
      {sending && sendingCopy}
      {sent && !sentErr && sentCopy}
      {sent && sentErr && sendingErr}
    </>
  );
};

export default Contact;

export const FieldHolder = (props) => {
  const { isvalid, goodclasses, badclasses } = props;
  const currentClasses = isvalid ? goodclasses : goodclasses + " " + badclasses;
  const newProps = Object.assign({}, props, { className: currentClasses });
  return <div {...newProps}>{props.children}</div>;
};

FieldHolder.propTypes = {
  children: PropTypes.any,
  isvalid: PropTypes.string,
  goodclasses: PropTypes.string.isRequired,
  badclasses: PropTypes.string.isRequired,
};

Contact.propTypes = {
  contactApi: PropTypes.string.isRequired,
};
