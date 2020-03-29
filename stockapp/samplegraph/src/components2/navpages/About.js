import React from 'react';

class About extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return(
            <div>
                <h1>About Page</h1>
                <p>
                How much room is there for innovation in software? I think there is a lot. There is more information available than ever and there are more services organizing that information than ever. Yet, there are so many things we really don't understand. Software is a definite product where we fully understand the functionality from the transistors to the programming. This is unlike, say, chemistry, where there is a lot of ambiguity to take into account of. However, different people understand different aspects of the software. No modern day Microsoft developer would dare touch the legacy code of long lived Windows products. Many web developers don't understand computer science nor electrical engineering too much, but they get the job done.

There are also externalities we don't fully understand yet. Technology addiction is a real problem we don't fully understand. Compared to some decades ago, technology has boosted our productivity, while also diminishing it (I'm unsure which one has a higher rate). Google makes information easily available, while also providing room for negative distrations. Social media allowed people to share ideas with each other remotely while also providing heavily distractive content (However I'm not a Facebook hater).

Lately, this paradox in the intentions of technology has been recognized. Productivity gurus noticed this, so they came into the scene to save the day. Podcasts are bigger than ever and self help book sales have been booming for the past decade. Psychology is becoming a hot topic. Why? Because we want to understands ourselves more than ever, now that we recognize the addictions to everyday apps. This helps fill in the gap between technology productivity and addiction.[..........unfinished]
                </p>
            </div>
        );
    }
}

export default About;