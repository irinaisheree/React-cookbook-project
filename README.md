Project Setup:

1.Initialize the project using Create React App.
2.Set up the folder structure, including components, contexts, and styles.

Implementing Components:

Develop individual components for each page:
1.Home(Content)
2.Recipes
3.Details(read only)
4.About
5.Login
6.Register

When the user is logged in:
3.Add
2.Details with functionality:
2.1 if the user is not the owner - they can add the recipe to their list
2.2 if the user is the owner - they can edit and delete the recipe
3.Profile - the user can see their list(liked recipes and added recipes)



Create forms for user actions such as login, registration, adding, and editing recipes.
Use React Router for navigation and defining routes.

Setting Up Context:

Create AuthContext to manage authentication state globally.
Use AuthContext.Provider to wrap the app and provide authentication state to components.

Implementing Authentication:

Add login and registration functionality.
Secure routes using a protection component to restrict access based on user authentication.
In the contexts component, I check if the user is logged in and if they're the owner and there is the logout functionality.

Styling:

I used a template for the styling.