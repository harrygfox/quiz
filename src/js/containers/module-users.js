import { connect } from 'react-redux';
import Users from '../components/module/users';
import { removeModuleMember } from '../actions/module';

const mapStateToProps = (state) => ({
    users: state.module.users,
    isFetchingModuleUsers: state.module.isFetchingModuleUsers,
    isRemovingMember: state.module.isRemovingMember,
    username: state.user.username
});

const mapDispatchToProps = (dispatch) => ({

    handleRemovingUser: (module_id, user_id) => {

        dispatch(removeModuleMember(module_id, user_id));
    }
});
const ModuleUsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default ModuleUsersContainer;
