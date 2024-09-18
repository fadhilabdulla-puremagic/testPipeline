import React from 'react'
import { Link } from 'react-router-dom'
import './app.css'

export function AboutUs() {
  return (
    <div className="site-wrap">
       <Link to="https://upgrade-skills.com"><img className="card-img-top" src="https://upgrade-skills.com/pix/upgradelogo.jpg" alt="Card image cap" /></Link>
       <h2>About Us</h2>
       <p style={{textAlign: 'justify'}}>
          Upgrade Skills is a platform that enables coaches & trainers to create, market, 
          sell, and deliver their own online courses. Our mission is to revolutionize the 
          way people learn and earn online by giving them the tools they need to turn their 
          expertise into a sustainable business that impacts both them and their audience.
       </p>

       <p>Follow Us</p>

     <p>
		    <a title="facebook" href="https://www.facebook.com/Upgradeskills-106960941622935" target="_blank"><img class="sm-icon" src="https://upgrade-skills.com/pix/aufb.png"/></a>
		  	<a title="instagram" href="https://www.instagram.com/upgrade.skills/" target="_blank"><img class="sm-icon" src="https://upgrade-skills.com/pix/auins.png"/></a>
			  <a title="linked in" href="https://www.linkedin.com/showcase/upgradeskills/?viewAsMember=true" target="_blank"><img class="sm-icon" src="https://upgrade-skills.com/pix/aulin.png"/></a>
	   </p>

    </div>
  )
}

