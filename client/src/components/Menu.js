import React, { useCallback } from 'react';

import Button from "@material-ui/core/Button";
import './Menu.scss'

const Menu = props => {

    const { user, deleteUser } = props

    const deleteUserFunction = useCallback(() => {
        deleteUser(user.email);
        //return to login page
    }, [deleteUser, user.email]);

    return (
        <div className="menu_view">
            <div >
                Welcome {user.name}!
            </div>

            <Button
                className="logout_button"
                size="small"
                onClick={deleteUserFunction}
            >
                Leave Chat
            </Button>
        </div>
    )
}

export default Menu;