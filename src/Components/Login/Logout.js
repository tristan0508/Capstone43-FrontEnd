import React from 'react'

export const Logout = () => {

    const logout = () => {
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload(true)

    }

    return (
        <>
            <button className="logoutBtn" onClick={logout}>Logout</button>
        </>
    )
}