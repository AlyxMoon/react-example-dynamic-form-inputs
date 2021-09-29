import { useState } from 'react'
import { connect } from 'react-redux'
import { formStuffModule } from './store/index'

/*
We want to make a form
This form can take multiple inputs

The big change from existing form stuff we've worked on:
There will be dynamic inputs

Credit card info form
that credit has rewards for certain categories

So a credit card might provide rewards in the gas and dining categories
But we don't want all categories to be showing at the same time

Rather, we want the user to select which categories a credit card has rewards for
And then we can enter in an input on how much the reward is for that category

*/

const App = () => {
  const categories = [
    '',
    'Gas',
    'Dining',
    'Clothes',
  ]

  const [formState, setFormState] = useState({
    name: '',
    categories: {
    }
  })

  const [selectedCategory, setSelectedCategory] = useState(0)

  const onChange = (event) => {
    setFormState({
      ...formState,
      name: event.target.value,
    })
  }

  // example of dynamic keys
  // let someDynamicKey = 'gas'
  // const myObject = {
  //   [someDynamicKey]: 2,
  // }
  // const myObject2 = {
  //   gas: 2,
  // }

  const addCategory = (event) => {
    event.preventDefault()
    
    setFormState({
      ...formState,
      categories: {
        ...formState.categories,
        [categories[selectedCategory]]: 0,
      }
    })
  }

  const removeCategory = (event, category) => {
    event.preventDefault()

    const newFormState = {
      ...formState,
      categories: {
        ...formState.categories,
      },
    }

    delete newFormState.categories[category]

    setFormState(newFormState)
  }

  const updateValueForCategory = (category, value) => {
    setFormState({
      ...formState,
      categories: {
        ...formState.categories,
        [category]: value,
      },
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()

    console.log(formState)
  }

  const filteredCategories = categories.filter(category => {
    return !(category in formState.categories)
  })

  return (
    <div className="app">
      <form onSubmit={onSubmit}>
        <label>Credit Card Name</label>
        <input 
          type="text"
          value={formState.name}
          onChange={onChange}
        />

        <fieldset>
          <legend>Add a category</legend>

          <select 
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(parseInt(event.target.value))}
          >
            {filteredCategories.map((category, i) => (
              <option key={category} value={i}>{category}</option>
            ))}
          </select>

          <button onClick={addCategory}>Add Category</button>
        </fieldset>

        <fieldset>
          <legend>Categories</legend>

          {Object.keys(formState.categories).map(category => (
            <div key={category}>
              <label>{category}</label>
              <input 
                value={formState.categories[category]} 
                onChange={(event) => updateValueForCategory(category, event.target.value)}
              />

              <button onClick={(event) => removeCategory(event, category)}>Remove</button>
            </div>
          ))}
        </fieldset>

        <button type="submit">Submit Me Darnit</button>
      </form>
    </div>
  )
}

const connector = connect(
  (state) => state,
  {
    defaultStuff: formStuffModule.actionCreators.defaultStuff,
  }
)

export default connector(App)
