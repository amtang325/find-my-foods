import React from 'react';
import 'bulma/css/bulma.min.css';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
  SignUpButton
} from "@clerk/clerk-react";
import MapComponent from "./MapComponent";

function NavComponent() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="/">
            Find My Food
          </a>
          <SignedIn>
            <a className="navbar-item" href="/">
              My Pins
            </a>

            <a className="navbar-item" href="/friends">
              Friends
            </a>
          </SignedIn>
        </div>

        <div className="navbar-end">
          <SignedOut>
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <SignInButton />
                </a>
                <a className="button is-light">
                  <SignUpButton />
                </a>
              </div>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-light">
                  <SignOutButton />
                </a>
                <UserButton />
              </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default NavComponent;
