import antfu from '@antfu/eslint-config'
export default antfu(
    {
        type: 'lib',
        typescript: true,
        rules: {
            'style/indent-binary-ops': 'off',
            'no-console': 'off',
            'node/prefer-global/process': 'off',
            'unused-imports/no-unused-vars': 'off',
            'style/indent': ['error', 4],
        },
    }
)
