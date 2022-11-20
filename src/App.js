import PostCard from './Components/PostCard';
import CreateComment from './Components/CreateComment'
import CreateUser from './Components/CreateUser'
import { useSelector } from 'react-redux'; 
import './App.css';

function App() {
  const { comments } = useSelector(state => state.post)
  console.log(comments)
  return (
    <div className='App'>
      <CreateUser />
      <CreateComment />
      <div className='comment-list-container'>
      {
        comments?.map((comment) => (
          <PostCard key={comment.id} comment={comment}/>
        ))
      }
      </div> 

      
    </div>
  );
}
 
export default App;
