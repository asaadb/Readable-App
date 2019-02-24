import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import {
  Badge,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@material-ui/core";
import { ThumbsUpDown } from "@material-ui/icons";
import CommentActions from "./CommentActions";

class Comments extends Component {
  render() {
    const { comment } = this.props;
    return (
      <Card key={comment.id} className="comment">
        <CardContent>
          <div className="author">
            <span>
              {comment.author} commented {formatDate(comment.timestamp)}
            </span>
          </div>
          <div className="vote-body">
            <Typography noWrap className="comment-body">
              {comment.body}
            </Typography>
            <div className="vote-count">
              <Badge
                badgeContent={comment.voteScore}
                style={{ marginRight: 20 }}
                max={999}
                color="primary"
              >
                <ThumbsUpDown />
              </Badge>
            </div>
          </div>
          <CardActions>
            <CommentActions comment={comment} />
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

export default connect()(Comments);
