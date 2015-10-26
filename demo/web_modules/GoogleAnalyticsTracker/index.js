import React, { Component } from "react"
import { PropTypes } from "react"

import ga from "react-google-analytics"
const GoogleAnalyticsInitiailizer = ga.Initializer

export default class GoogleAnalyticsTracker extends Component {

  static propTypes = {
    children: PropTypes.element,
    params: PropTypes.object.isRequired,
  }

  static contextTypes = {
    pkg: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { pkg } = this.context
    if (__PROD__) {
      ga("create", pkg.googleAnalyticsUA, "auto")
    }
    if (__DEV__) {
      console.info("ga.create", pkg.googleAnalyticsUA)
    }
    this.logPageview()
  }

  componentWillReceiveProps(props) {
    if (props.params.splat !== this.props.params.splat) {
      this.logPageview()
    }
  }

  logPageview() {
    if (__PROD__) {
      ga("send", "pageview")
    }
    if (__DEV__ && typeof window !== "undefined") {
      console.info("New pageview", window.location.href)
    }
  }

  render() {
    return (
      <div>
        { this.props.children }
        <GoogleAnalyticsInitiailizer />
      </div>
    )
  }
}