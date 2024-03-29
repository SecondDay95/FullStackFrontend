import React from 'react'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
        <a className="navbar-brand" href="/">
            Project 
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
        </button>
        </div>
        </nav>
    )
}
