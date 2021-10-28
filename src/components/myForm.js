import { Form, Field } from 'react-final-form'

const MyForm = ({ name, genre, year, id, onSubmit}) => {

    return <Form
        onSubmit={onSubmit}
        initialValues={{
            name, genre, year, id
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="m-r">Nom du film</label>
                    <Field
                        name="name"
                        component="input"
                        type="text"
                        placeholder="Movie Name"
                    />
                </div>
                <div>
                    <label className="m-r">Genre </label>
                    <Field
                        name="genre"
                        component="input"
                        type="text"
                        placeholder="Genre"
                    />
                </div>
                <div>
                    <label className="m-r">Année de realisation </label>
                    <Field
                        name="year"
                        component="input"
                        type="date"
                        placeholder="Year"
                    />
                </div>
                <div>
                    <button type="submit" className="m-r" disabled={submitting || pristine}>
                        Submit
                      </button>
                    <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                    >
                        Reset
                      </button>
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
        )}
    />
};

export default MyForm;