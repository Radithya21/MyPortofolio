import AboutMe from '../components/AboutMe';
import MyJourney from '../components/MyJourney';
import MyProjectsPreview from '../components/MyProjectsPreview';


function Home() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#0F0C29] via-[#24243e] to-[#302b63]">
            <AboutMe />
            <MyJourney />
            <MyProjectsPreview />
        </div>
    );
}

export default Home; 