import {FaPizzaSlice, FaHamburger} from 'react-icons/fa'
import {GiNoodles, GiChopsticks, GiButterToast} from 'react-icons/gi'
import styled from 'styled-components'
import {NavLink}  from 'react-router-dom'
                
function Category() {
  return (
    <List>
      <Slink to={'/cuisine/European'}>
          <FaPizzaSlice/>
          <h4>European</h4>
      </Slink>
      <Slink to={'/cuisine/American'}>
          <FaHamburger/>
          <h4>American</h4>
      </Slink>
      <Slink to={'/cuisine/Asian'}>
          <GiNoodles/>
          <h4>Asian</h4>
      </Slink>
      <Slink to={'/cuisine/Chinese'}>
        <GiChopsticks />
        <h4>Chinese</h4>
      </Slink>
    </List>
  )
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
`
const Slink = styled(NavLink)`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-inline: 1rem;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  curser: pointer;
  transform: scale(0.8);
  h4 {
    color: white;
    font-size: 0.8rem;
  }
  svg {
    color: white;
    font-size: 1.5rem;
  }
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }
`

export default Category
