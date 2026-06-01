import { Page, withModel } from '@adobe/aem-react-editable-components';
import React from 'react';

// This component is the application entry point
class App extends Page {
  render() {
    // Get brand from HTML data attribute or default to 'arrow'
    const brand = document.documentElement.dataset.brand || 'arrow';
    
    return (
      <div className={`brand-${brand}`}>
        {this.childComponents}
        {this.childPages}
      </div>
    );
  }
}

export default withModel(App);
