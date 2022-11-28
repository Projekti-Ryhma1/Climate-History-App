import React from 'react';

export default function Home(props) { //TEST//TEST
return (
    <form>
        <div>
            User login status: { props.userLoggedIn ? "is logged in" : "not logged in"}
        </div>
    </form>
)


}