export default function RecepiesList(){
  return (
    
    <div className="recipe-list">
    {recipes.map((recipe, index) => (
      <div className="recipe-item" key={index}>
        <h3>{recipe.title}</h3>
        {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} />}
        <p>{recipe.description}</p>
        <p>Total Cost: ${recipe.totalCost}</p>
        <p>Creator: {recipe.creator}</p>
        <button onClick={() => handleEdit(index)}>Edit</button>
        <button onClick={() => handleDelete(index)}>Delete</button>
      </div>
    ))}
  </div>
  );
}