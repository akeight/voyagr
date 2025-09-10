from pathlib import Path
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

DATA_DIR = Path(__file__).resolve().parents[2] / "data" / "guides"
DB_DIR = Path(__file__).resolve().parents[2] / "var" / "chroma"
DB_DIR.mkdir(parents=True, exist_ok=True)

def _build_store():
    loader = DirectoryLoader(str(DATA_DIR), glob="**/*.md", loader_cls=TextLoader)
    docs = loader.load()
    splits = RecursiveCharacterTextSplitter(chunk_size=1200, chunk_overlap=150).split_documents(docs)
    vs = Chroma.from_documents(
        splits, OpenAIEmbeddings(), persist_directory=str(DB_DIR), collection_name="guides"
    )
    vs.persist()
    return vs

_store = None
def get_retriever():
    global _store
    if _store is None:
        # Reopen if persisted; build if empty
        try:
            _store = Chroma(persist_directory=str(DB_DIR), embedding_function=OpenAIEmbeddings())
        except Exception:
            _store = _build_store()
    return _store.as_retriever(search_kwargs={"k": 6})
