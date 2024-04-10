import { Auth } from "../components/Auth"
import Auth_layout from "../components/Auth_layout"

const Signin = () => {
 
    return (
      <div className="grid-cols-2 md:grid ">
          <div>
            <Auth type="signin"/>
          </div>
          <div className="invisible md:visible">
              <Auth_layout  />
          </div>
      </div>
  )
}

export default Signin