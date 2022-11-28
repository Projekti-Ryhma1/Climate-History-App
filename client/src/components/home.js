import React from 'react';

//TEST CAN BE DELETED
export default function Home(props) {
return (
    <form>
        <div>
            User login status: { props.userLoggedIn ? "is logged in" : "not logged in"}
        </div>
    </form>
)


}