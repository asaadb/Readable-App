import React from "react";
import { connect } from "react-redux";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  OutlinedInput,
  FormControl,
  withStyles
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { handleAddPost } from "../actions/posts";
import ReactDOM from "react-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexFlow: "column",
    boxSizing: "border-box",
    width: "95%",
    padding: "2rem",
    maxWidth: 850,
    alignContent: "center",
    margin: "20px auto",
    boxShadow: " 0 1px 10px 0px #777",
    border: "1px solid #dad7d7",
    borderRadius: 5,
    backgroundColor:'#fff'
  },
  formHeader: {
    textAlign: "center",
    fontSize: "2rem",
    margin: theme.spacing.unit,
    color: "#323232"
  },
  form: {
    display: "flex",
    flexFlow: "column"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  category: {
    maxWidth: 200
  },
  submitBtn: {
    margin: theme.spacing.unit,
    width: 180,
    alignSelf: "center"
  }
});

class NewPost extends React.Component {
  state = {
    title: "",
    body: "",
    author: "",
    category: "",
    labelWidth: 0,
    toHome: false
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }
  handleSubmit = event => {
    event.preventDefault();
    const post = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddPost(post));
    this.setState(() => ({
      title: "",
      body: "",
      author: "",
      category: "",
      toHome: true
    }));
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  isDisabled = () => {
    const { title, body, author, category } = this.state;
    return title === "" || body === "" || author === "" || category === "";
  };
  render() {
    const { title, body, author, category, toHome } = this.state;
    if (toHome === true) {
      return <Redirect to="/" />;
    }
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography variant="h3" className={classes.formHeader}>
          Add a New Post
        </Typography>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <TextField
            className={classes.textField}
            margin="normal"
            required
            variant="outlined"
            label="Name"
            type="name"
            value={author}
            onChange={this.handleChange("author")}
          />
          <TextField
            className={classes.textField}
            margin="normal"
            required
            variant="outlined"
            label="Title"
            value={title}
            onChange={this.handleChange("title")}
          />
          <FormControl
            variant="outlined"
            className={[classes.formControl, classes.category]}
          >
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-category"
            >
              Category
            </InputLabel>
            <Select
              value={category}
              onChange={this.handleChange("category")}
              input={
                <OutlinedInput
                  name="category"
                  id="outlined-category"
                  labelWidth={this.state.labelWidth}
                />
              }
            >
              {this.props.categories.map(category => (
                <MenuItem value={category.name}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Post"
            value={body}
            className={classes.textField}
            margin="normal"
            required
            variant="outlined"
            multiline={true}
            rows={5}
            onChange={this.handleChange("body")}
          />
          <Button
            disabled={this.isDisabled()}
            color="primary"
            variant="contained"
            type="submit"
            className={classes.submitBtn}
          >
            Post
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

export default connect(mapStateToProps)(withStyles(styles)(NewPost));
