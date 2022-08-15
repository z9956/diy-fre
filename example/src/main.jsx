import { render, h, useState } from '../../src';

const Header = (props) => {
	return <h1>{props.title}</h1>;
};

const App = () => {
	const [state, setState] = useState(1);

	const handleAdd = () => {
		setState((count) => count + 1);
	};

	return (
		<div>
			<Header title="title" />
			<button onClick={handleAdd}>add</button>
			<p>
				count:<span>{state}</span>
			</p>
		</div>
	);
};

const container = document.getElementById('root');
render(<App />, container);
