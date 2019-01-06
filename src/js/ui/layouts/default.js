'use strict';

import m from 'mithril';

import {Auth} from './../../auth';
import {Book} from './../../model/book';
import {Notification} from './../../model/notification';

// View Components
import NavBar from './../components/navbar';
import Footer from './../components/footer';
import Alert from './../components/alert';

/**
 * Default layout that is extended by pages.
 */
class LayoutDefault {
  /**
   * Initialize layout and load up auth, book, and notification models.
   */
  constructor() {
    this.auth = new Auth();
    this.book = new Book();
    this.notification = new Notification();
  }

  /**
   * Get notification count if user is logged in.
   *
   * @param  {Vnode} vnode
   */
  oninit(vnode) {
    if (this.auth.token) {
      this.notification.count();
    }
  }

  /**
   * Display the page layout.
   *
   * @param  {Vnode} vnode
   * @return {Vnode} [description]
   */
  view(vnode) {
    // Make sure we have notification counts before rendering
    if (this.auth.token && this.notification.data == null) {
      return false;
    }

    return [
      m(NavBar, {
          auth: this.auth,
          book: this.book,
          notifications: this.notification.data,
          pathname: vnode.attrs.pathname,
      }),
      m('main', [
        Alert.view(),
        vnode.children,
      ]),
      m(Footer, {pathname: vnode.attrs.pathname}),
    ];
  }
}

export default LayoutDefault;