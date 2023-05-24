import os
import json
from ast import List


def load_env_var_list(env_var_name:str, default_value:List) -> List:
    """Load a list from an environment variable

    Args:
        env_var_name (str): environment variable name set in the OS/Container
        default_value (List[object]): default value set

    Returns:
        List[str]: value set
    """
    raw_env_value = os.environ.get(env_var_name,default_value)
    env_value = json.loads(raw_env_value)
    return env_value
