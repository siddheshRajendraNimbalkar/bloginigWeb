import { Auth } from "../components/Auth"
import Auth_layout from "../components/Auth_layout"

const Signup = () => {
  return (
    <div className=" md:grid grid-cols-2">
        <div>
          <Auth type="signup"/>
        </div>
        <div className="invisible md:visible">
            <Auth_layout  />
        </div>
    </div>
  )
}

export default Signup

