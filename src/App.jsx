import "./App.css";
import Otis from "./assets/Otis.png";
import ChatBox from "./ChatBox";

function App() {
	return (
		<div className="h-screen w-screen bg-neutral-50">
			<div className="absolute mx-2 my-4 flex items-center gap-4">
				<img src={Otis} className="w-12" alt="Otis Logo" />
				<h1 className="hidden text-3xl sm:block">Otis</h1>
			</div>

			<div className="h-screen lg:left-1/2 lg:w-1/2 lg:translate-x-1/2">
				<ChatBox />
			</div>
		</div>
	);
}

export default App;
