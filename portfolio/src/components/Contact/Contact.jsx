import "./Contact.css";

import {
Mail,
Github,
Linkedin,
Send
} from "lucide-react";

export default function Contact(){

return(

<section
id="contact"
className="contact-section"
>

<div className="contact-card">

<span>LET'S BUILD</span>

<h2>The Next Intelligent System</h2>

<p>

Interested in AI, Computer Vision,
Machine Learning or Software Engineering?

Let's connect.

</p>

<div className="contact-buttons">

<a
href="mailto:jasleen7904@gmail.com"
className="btn"
>

<Mail size={18}/>

Email

</a>

<a
href="https://github.com/jasleeeen"
target="_blank"
rel="noreferrer"
className="btn btn-outline"
>

<Github size={18}/>

GitHub

</a>

<a
href="https://linkedin.com/in/jasleen-kaur-sohal-286117271"
target="_blank"
rel="noreferrer"
className="btn btn-outline"
>

<Linkedin size={18}/>

LinkedIn

</a>

</div>

<div className="terminal">

<span>$ status</span>

<p>Workspace Online</p>

<span>$ collaboration</span>

<p>Always Open</p>

<span>$ send_message</span>

<p className="blink">

<Send size={16}/>

Waiting...

</p>

</div>

</div>

</section>

);

}