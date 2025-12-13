from pathlib import Path
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from app.core.config import settings

DATA_DIR = Path(__file__).resolve().parents[2] / "data" / "guides"
DB_DIR = Path(__file__).resolve().parents[2] / "var" / "chroma"
DB_DIR.mkdir(parents=True, exist_ok=True)

def _get_embeddings():
    """Create OpenAIEmbeddings with API key from settings"""
    return OpenAIEmbeddings(
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url or None
    )

def _build_store():
    # Create data directory if it doesn't exist
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    # Check if directory has any markdown files
    if not DATA_DIR.exists() or not any(DATA_DIR.glob("**/*.md")):
        # Create an empty store if no data files exist
        vs = Chroma(
            persist_directory=str(DB_DIR),
            embedding_function=_get_embeddings(),
            collection_name="guides"
        )
        return vs
    
    loader = DirectoryLoader(str(DATA_DIR), glob="**/*.md", loader_cls=TextLoader)
    docs = loader.load()
    
    if not docs:
        # Return empty store if no documents loaded
        vs = Chroma(
            persist_directory=str(DB_DIR),
            embedding_function=_get_embeddings(),
            collection_name="guides"
        )
        return vs
    
    splits = RecursiveCharacterTextSplitter(chunk_size=1200, chunk_overlap=150).split_documents(docs)
    vs = Chroma.from_documents(
        splits, _get_embeddings(), persist_directory=str(DB_DIR), collection_name="guides"
    )
    vs.persist()
    return vs

_store = None
def get_retriever():
    global _store
    if _store is None:
        # Reopen if persisted; build if empty
        try:
            _store = Chroma(
                persist_directory=str(DB_DIR),
                embedding_function=_get_embeddings(),
                collection_name="guides"
            )
        except Exception:
            _store = _build_store()
    return _store.as_retriever(search_kwargs={"k": 6})
