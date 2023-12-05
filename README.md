# Semicolon - Online Coding Problem Judge : Backend

---

[Semicolon](https://semicolon-project.netlify.app/) is an online coding problem judge platform with the following objectives:

1. Host coding assignments and coding contest
2. Clean user interface
3. Gamification Elements: To engage users and make them regular on the platform

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.
Also create the .env file and add environment variables as mentioned below.

```sh
git clone git@github.com:devansh016/semicolon.git
npm install
npm start
```

## Environment Variable Required

```sh
MONGODB_URL =
JWT_SECRET =
JUDGE_0_URL =
PORT =
```

Your app should now be running on [localhost](http://localhost/) at port 80 (or the .

## Make Your First Contribution

1. Fork this repository, **star this repository** , and clone it onto your machine.
   ```
   git clone https://github.com/<my_account>/semicolon.git
   ```
1. Create a new branch and switch to it.

   ```
   cd semicolon
   git checkout -b <new_branch_name>
   ```

1. Make changes to the code on that branch, add your details in [res/contributors.json](contributors.json) and commit.
1. Push the commit to GitHub.

   ```
   git push origin <new_branch_name>
   ```

1. Make a pull request on GitHub.

### Database Design

![Database Design](/res/images/db-design.png "Database Design")

### Userflow Design

![Userflow Design](/res/images/userflow-design.png "Userflow Design")

### Home Page

![Home Page](/res/images/Semicolon-HomePage.png "Home Page")

### Problem Page

![Problem Page](/res/images/Semicolon-ProblemPage.png "Problem Page")

### Editor Page

![Editor Page](/res/images/Semicolon-EditorPage.png "Editor Page")

## License

Distributed under the MIT License. See [LICENSE](/LICENSE) for more information.
