import React, { useEffect, useState } from "react";

import Input from "./Input";
import useInput from "./useInput";
import { CommentIcon, SearchIcon, } from "./Icons";
import validator from "validator";
import { useLocation } from "@reach/router";
import axios from "axios";
import { parse } from "query-string";

const Main = () => {
  const location = useLocation();
  const searchParams = parse(location.search);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(
    searchParams.error ? true : false
  );
  const longUrl = useInput("");
  const [shortUrl, setShortUrl] = useState("");
  const [isShortUrlVisible, setIsShortUrlVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState(
    searchParams.error == "true"
      ? "Error occured, please try again."
      : ""
  );
  useEffect(() => {
    document.title = "Shortener";
  });
  const API_URL = "https://urlshn.herokuapp.com/shorturl"
  const handleForm = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${API_URL}`,
      data: {longUrl: longUrl.state} ,
    })
      .then((response) => {
        console.log(response,'the response')
        console.log(response.status,'the status')
        if (response.status == 200) {
          setShortUrl(response.data.shortUrl)
          setIsShortUrlVisible(true);
          console.log(shortUrl)
        }
      })
      .catch((err) => {
        console.log(err,'the error')
        setErrorMessage("Oops!, An error occured");
        setIsErrorMessageVisible(true);
      });
  };

  return (
    <main className="row">
      <div className="col-1-2 col-1-2-l col jc-c">
        <div className="benefits-panel col as-c">
          <ul>
            <li>
              <SearchIcon />
              <p>Get a short url.</p>
            </li>

            <li>
              <CommentIcon />
              <p>Join the community.</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-1-2 col-1-2-r col jc-c p-r">
        <div className="auth-option-panel as-c">


        <form className="login-form" onSubmit={handleForm} >
        {/* <TwitterLogo /> */}
        <h1>URL SHORTENER</h1>
        {isErrorMessageVisible ? (
          <div className="error-wrapper">
            <span className="error">{errorMessage}</span>
          </div>
        ) : null}
        <div className="input-wrapper">
          <Input
                type="text"
                id="name"
                labelName="URL"
                value={longUrl.state}
                onChange={longUrl.onChange}
                isInvalid={
                  validator.isEmpty(longUrl.state, { ignore_whitespace: true }) &&
                  longUrl.isTouched
                }
              />
        </div>
        <button
          className="btn btn--blue"
          type="submit"
          disabled={!longUrl.state}
        >
          Shorten URL
        </button>
      </form>
        
        </div>
        {isShortUrlVisible ? (
          <div className="auth-option-panel as-c">
            <div className="user-card">
              <div className="user-card-c">
                <span className="user-card-handle">{shortUrl}</span>
              </div>

            </div>
          </div>
          
          
        ) : null}
      </div>
    </main>
  );
};

export default Main;
