
const Select_ROle = () => {
    const handleclick_user_driver = () => {
        localStorage.setItem("role_User", 100);
    }
    const handleclick_Admin = () => {
        localStorage.setItem("role_User", 200);
    }
    return (
        <div>
            <div>
                <button onClick={handleclick_user_driver}>user</button>
                <button onClick={handleclick_Admin}>admin</button>
            </div>

        </div>
    )
}

export default Select_ROle

