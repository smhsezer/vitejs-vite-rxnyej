import { Component } from 'preact';

export class Html extends Component {
  render() {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: this.props.text }}
        key={window.pageId + 'html' + this.props.text.substring(0, 6)}
      ></div>
    );
  }
}
