import { useEffect, useState } from "react";
import styled from "styled-components"
import SearchResult from "./component/searchresult/SearchResult";

export const URL = "http://localhost:9000";

function App() {
  const [data , setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterData , setFilterData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [selectedBtn, setSelectedBtn] = useState("all");
  useEffect(()=>{
    const  fetchfoodData = async()=>{
      setLoading(true);
      try{
        const response = await fetch(URL);
        const json = await response.json();
        setData(json);
        setFilterData(json);
        setLoading(false);
      }catch{
        setError("have same issue fetching data");
      }
    };
    fetchfoodData();
  },[]);

  const SearchFood = (e)=>{
    const searchValue = e.target.value;
    console.log(searchValue);
    if(searchValue === ""){
      setFilterData(null);
    }
    const filter = data.filter((food)=>food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filter);
  };
  const filterFood = (type)=>{
    if(type === "all"){
      setFilterData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food)=> food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(filter);
    setSelectedBtn(type);
  }

  const filterBtn = [
    {
      name: "All",
      type: "All"
    },
    {
      name: "Breakfast",
      type: "Breakfast"
    },
    {
      name: "Lunch",
      type: "Lunch"
    },
    {
      name: "Dinner",
      type: "dinner"
    }

  ]

  console.log(data);
  if(error) return<div>{error}</div>;
  if(loading) return<div>loading.......</div>;



  return (
   <>
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/images/Foody Zone.svg" alt="logo" />
        </div>
        <div className="search">
          <input onChange={SearchFood} placeholder="Search Food..." />
        </div>
      </TopContainer>
      <FilterButton>
        {filterBtn.map((value)=>(
           <Button key={value.name} onClick={()=> filterFood(value.type)}>{value.name}</Button>
        ))}
        {/* <Button onClick={()=> filterFood("all")}>All</Button>
        <Button onClick={()=> filterFood("Breakfast")}>Breakfast</Button>
        <Button onClick={()=> filterFood("Lunch")}>Lunch</Button>
        <Button onClick={()=> filterFood("Dinner")}>Dinner</Button> */}
      </FilterButton>
    </Container>
    <SearchResult data={filterData}/>
   </>
  )
}

export default App


export const Container = styled.div`

  max-width: 1200px;
  margin: 0 auto;

`;

const TopContainer = styled.div`
  height: 146px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search{
    input{
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0px 10px;
      &::placeholder{
      color: white;
    }
    }
  }

  @media (0 < width < 600px){
    flex-direction: column;
    height: 120px;

  }
`;


const FilterButton = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  color: white;
  padding-bottom: 40px;

`;

export const Button = styled.button`
  background-color: #ff4344;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: #ed0707;
  }

`;

