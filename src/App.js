import { useState } from 'react';
import './App.css';

import { Searchbar } from './components/Searchbar/Searchbar';
import { ImagesList } from './components/ImagesList/ImagesList';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchImages = value => {
    setSearchQuery(value);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={searchImages} />
      <ImagesList searchValue={searchQuery} />
    </div>
  );
};

// class App extends Component {
//   state = {
//     searchQuery: '',
//   };

// searchImages = value => {
//   this.setState({ searchQuery: value });
// };

//   render() {
// return (
//   <div className="App">
//     <Searchbar onSubmit={this.searchImages} />
//     <ImagesList searchValue={this.state.searchQuery} />
//   </div>
// );
//   }
// }

export default App;
