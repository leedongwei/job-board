import { connect } from 'react-redux';
import { Switch } from 'react-router';

// https://github.com/ReactTraining/react-router/blob/d1071993e6262bc2e752c79b52a445979ce67111/packages/react-router-redux/examples/BasicExample.js#L19-L21
const mapStateToProps = (state: Store.State) => ({
  location: state.router.location,
});
export default connect(mapStateToProps)(Switch as any); // tslint:disable-line:no-any
